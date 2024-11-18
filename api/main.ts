import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import routeStaticFilesFrom from "./routeStaticFilesFrom.ts";
import { supabase } from "./supabase/client.ts";
import {
  deleteEvidenceRecord,
  fetchAllEvidenceBooksByUserId,
  fetchEvidenceByBookId,
  uploadEvidenceFile,
  createEvidenceRecord,
} from "./supabase/evidenceActions.ts";

const router = new Router();

//evidence upload
router.post("/api/evidence/upload", async (context) => {
  const body = await context.request.body.formData();
  const newFileName = body.get("newFileName");
  const file = body.get("file");
  if (!file) {
    context.response.status = 400;
    context.response.body = { message: "file is required" };
    return;
  }
  if (!newFileName) {
    context.response.status = 400;
    context.response.body = { message: "newFileName is required" };
    return;
  }
  context.response.body = await uploadEvidenceFile(
    { file, newFileName },
    supabase,
  );
});

//createEvidenceEntry
router.post("/api/evidence", async (context) => {
  const body = await context.request.body.json();
  if (!body) {
    context.response.status = 400;
    context.response.body = { message: "newEntry is required" };
    return;
  }
  context.response.body = await createEvidenceRecord(body, supabase);
});

//getEvidenceBooksByUserId
router.get("/api/evidence/user/:user_id", async (context) => {
  const userId = context.params.user_id;
  if (!userId) {
    context.response.status = 400;
    context.response.body = { message: "user_id is required" };
    return;
  }
  context.response.body = await fetchAllEvidenceBooksByUserId(userId, supabase);
});

//deleteEvidenceEntryById
router.delete("/api/evidence/:entryId", async (context) => {
  const id = context.params.entryId;
  const body = await context.request.body.json();
  console.log("deleteEvidenceEntryByIdss", id, body);
  if (!id) {
    context.response.status = 400;
    context.response.body = { message: "entryId is required" };
    return;
  }
  if (!body.fileName) {
    context.response.status = 400;
    context.response.body = { message: "fileName is required" };
    return;
  }
  context.response.body = await deleteEvidenceRecord({
    id,
    fileName: body.fileName,
  }, supabase);
});

//getEvidenceByBookId
router.get("/api/evidence/book/:evidence_book_id", async (context) => {
  const evidenceBookId = context.params.evidence_book_id;
  if (!evidenceBookId) {
    context.response.status = 400;
    context.response.body = { message: "evidence_book_id is required" };
    return;
  }
  context.response.body = await fetchEvidenceByBookId(evidenceBookId, supabase);
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/dist`,
  `${Deno.cwd()}/public`,
]));

// Catch-all route to serve index.html for all client-side routes
app.use(async (context) => {
  // Make sure the request is not for an API or static file
  if (
    !context.request.url.pathname.startsWith("/api") &&
    !context.request.url.pathname.includes("/static")
  ) {
    context.response.headers.set("Content-Type", "text/html");
    context.response.body = await Deno.readTextFile(
      `${Deno.cwd()}/dist/index.html`,
    );
  }
});

await app.listen({ port: 8000 });
