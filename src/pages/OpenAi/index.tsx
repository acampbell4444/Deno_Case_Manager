// import React, { ChangeEvent, useState } from "react";
// import { Form } from "react-final-form";
// import { TextField } from "mui-rff";
// import {
//   Avatar,
//   Box,
//   Button,
//   CircularProgress,
//   Paper,
//   Stack,
//   Typography,
// } from "@mui/material";
// import { useLazyGetChatResponseQuery } from "../../services/openAi/apiSlice.ts";
// import {
//   AttachFile as AttachFileIcon,
//   AutoAwesome as AutoAwesomeIcon,
//   Send as SendIcon,
// } from "@mui/icons-material";
// import HeroSection from "../../components/HeroHeader.tsx";
// import { heroIconStyle } from "../../themes/icons.ts";
// import { heroTextStyle } from "../../themes/text.ts";

// interface FormValues {
//   message: string;
// }

// const Chat: React.FC = () => {
//   // Trigger function and response from the API
//   const [trigger, { data, error, isLoading }] = useLazyGetChatResponseQuery();
//   // State for file content
//   const [fileContent, setFileContent] = useState<string>("");

//   // Function to handle file selection and content reading
//   const handleFileChange = async (event: any) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setFileContent(e.target?.result as string);
//       };
//       reader.readAsText(file);
//     }
//   };

//   // Function to handle sending the message
//   const handleSend = async (values: FormValues) => {
//     const messages = [{ role: "user", content: values.message }];

//     if (fileContent) {
//       messages.push({ role: "user", content: `File content: ${fileContent}` });
//     }

//     trigger(messages); // Trigger the API request
//   };

//   return (
//     <>
//       <HeroSection>
//         <Stack direction="row" spacing={2} justifyContent="center">
//           <Typography
//             variant="h4"
//             sx={{
//               ...heroTextStyle,
//               fontSize: "2rem",
//               fontWeight: "bold",
//             }}
//           >
//             <Avatar
//               sx={{ ...heroIconStyle, mr: 1, color: "#FF6F61", height: 40, width: 40 }}
//             >
//               <AutoAwesomeIcon sx={{ fontSize: 30 }} />
//             </Avatar>
//             Chat with AI
//           </Typography>
//         </Stack>
//       </HeroSection>

//       <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f9f9f9" }}>
//         <Form
//           onSubmit={handleSend}
//           render={({ handleSubmit, form }) => (
//             <form
//               onSubmit={(event) => {
//                 handleSubmit(event);
//               }}
//             >
//               <Box mb={2}>
//                 <TextField
//                   name="message"
//                   label="Type your message..."
//                   multiline
//                   rows={4}
//                   variant="outlined"
//                   fullWidth
//                   required
//                   sx={{
//                     backgroundColor: "white",
//                     borderRadius: "4px",
//                     boxShadow: 2,
//                     "& .MuiInputBase-root": {
//                       borderRadius: "8px",
//                     },
//                   }}
//                 />
//               </Box>

//               {/* File input with custom button */}
//               <Box display="flex" alignItems="center" mb={2}>
//                 <input
//                   type="file"
//                   id="file-upload"
//                   // accept=".txt,.doc,.pdf"
//                   onChange={(event) => handleFileChange(event)}
//                   style={{ display: "none" }}
//                 />
//                 <label htmlFor="file-upload">
//                   <Button
//                     variant="outlined"
//                     component="span"
             
//                     startIcon={<AttachFileIcon />}
//                   >
//                     Choose File
//                   </Button>
//                 </label>
//               </Box>

//               {/* Submit button in a row */}
//               <Box display="flex" justifyContent="space-between" mb={2}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={isLoading}
//                   startIcon={isLoading
//                     ? <CircularProgress size={20} />
//                     : <SendIcon />}
           
//                 >
//                   {isLoading ? "Loading..." : "Send"}
//                 </Button>
      
//               </Box>
//             </form>
//           )}
//         />

//         <Box
//           mt={4}
//           sx={{ backgroundColor: "#f1f1f1", padding: 2, borderRadius: "8px" }}
//         >
//           <Typography variant="h6" gutterBottom>
//             AI Response:
//           </Typography>
//           <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
//             {data
//               ? data.choices[0].message.content
//               : error
//               ? `Error: ${'status' in error ? error.status : error.message}`
//               : "No response yet"}
//           </Typography>
//         </Box>
//       </Paper>
//     </>
//   );
// };

// export default Chat;
