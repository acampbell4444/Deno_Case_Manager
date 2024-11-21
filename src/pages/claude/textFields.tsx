import React from "react";
import { TextField } from "@mui/material";

interface CustomTextFieldProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<any>) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, value, onChange }) => {
    return (
        <TextField
            label={label}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={value}
            onChange={onChange}
            sx={{
                backgroundColor: "#ffffff", // White background
                color: "#121212", // Dark text color
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "16px",
                fontWeight: "bold",
                borderColor: "#34D399", // Cool green border color
                "&:hover": {
                    borderColor: "#2c6e2f", // Darker green border on hover
                    color: "#121212", // Dark text color on hover
                },
                "&.Mui-focused": {
                    borderColor: "#34D399", // Cool green border when focused
                },
                transition: "all 0.3s ease",
                marginBottom: 2,
            }}
        />
    );
};

export default CustomTextField;
