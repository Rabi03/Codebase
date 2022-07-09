import React from 'react';
import { Container, Grid } from '@mui/material';
import CreateCommunity from './CreateCommunity';


export default function index() {
  return (
    <Container sx={{ mt: 3,mb:3 }} maxWidth="lg">
        <CreateCommunity />
    </Container>
  )
}
