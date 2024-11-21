import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import routeStaticFilesFrom from "./routeStaticFilesFrom.ts";
import {
  createEvidenceRecord,
  deleteEvidenceRecord,
  fetchAllEvidenceBooksByUserId,
  fetchEvidenceByBookId,
  uploadEvidenceFile,
} from "./supabase/evidenceActions.ts";
import {  generateLegalAnalysis } from "./supabase/claudeActions.ts";
import { fetchAllArgumentsByUserId } from "./supabase/argumentsActions.ts";
// import { hardcodedCaseData } from "./supabase/claudeActions.ts";

const hardcodedAnalysis = {
  summary: "This case involves a contract dispute between two software companies over licensing terms and intellectual property rights. The plaintiff alleges breach of contract and unauthorized use of proprietary code.",
  keyPoints: [
    "Contract was signed in January 2023",
    "Disputed code usage occurred between March-June 2023",
    "Damages claimed: $500,000",
    "Prior business relationship existed for 3 years",
    "Multiple written warnings were issued"
  ],
  recommendations: [
    "Pursue mediation before litigation",
    "Gather all email correspondence from 2023",
    "Review code repository access logs",
    "Document all instances of unauthorized use",
    "Consider seeking injunctive relief"
  ]
};

const router = new Router();

//generateLegalAnalysis
router.post("/api/claude", async (ctx) => {
  const prompt = await ctx.request.body.text()
  try {
    ctx.response.body = JSON.stringify(await generateLegalAnalysis(prompt))
    ctx.response.status = 200;
  } catch (error) {
    console.error("Error:", error);
    ctx.response.body = {
      success: false,
      error: "Failed to retrieve analysis",
      details: error instanceof Error ? error.message : "Unknown error occurred"
    };
    ctx.response.status = 500;
  }
});

//fetchAllArgumentByUserId
router.get("/api/arguments/user/:user_id", async (context) => {
  const userId = context.params.user_id;
  if (!userId) {
    context.response.status = 400;
    context.response.body = { message: "user_id is required" };
    return;
  }
  context.response.body = await fetchAllArgumentsByUserId(userId);
});

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
  context.response.body = await createEvidenceRecord(body);
});

//getEvidenceBooksByUserId
router.get("/api/evidence/user/:user_id", async (context) => {
  const userId = context.params.user_id;
  if (!userId) {
    context.response.status = 400;
    context.response.body = { message: "user_id is required" };
    return;
  }
  context.response.body = await fetchAllEvidenceBooksByUserId(userId);
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
  });
});

//getEvidenceByBookId
router.get("/api/evidence/book/:evidence_book_id", async (context) => {
  const evidenceBookId = context.params.evidence_book_id;
  if (!evidenceBookId) {
    context.response.status = 400;
    context.response.body = { message: "evidence_book_id is required" };
    return;
  }
  context.response.body = await fetchEvidenceByBookId(evidenceBookId);
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
