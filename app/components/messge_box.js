'use client'

import React from 'react'
import { SupportAgent } from "@mui/icons-material";
import { Avatar, Box, Card, Typography } from "@mui/material";
import Markdown from 'react-markdown';

function MessageBox({ ai, text }) {
    return (
        ai ? (
            <Box  sx={{ display: "flex", justifyContent: "flex-start"}}>
                <Avatar alt="User Avatar" sx={{m:1}}>
                <SupportAgent />
                </Avatar>
                <Box
                    sx={{ width: "70%", backgroundColor: '#CADCC7', borderRadius: 4, padding: 2 }}
                >
                    <Typography variant="subtitle1">
                        <Markdown>{text}</Markdown>
                    </Typography>
                </Box>
            </Box>
           
        ) : (
            <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
                <Card sx={{ width: "50%", backgroundColor: '#C7D0DC', borderRadius: 4, padding: 2 }}>
                    <Typography variant="body1">
                        {text}
                    </Typography>
                </Card>
            </Box>
        )
    );
}

export default MessageBox;
