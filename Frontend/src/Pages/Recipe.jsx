import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  Rating,
  Avatar,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe details. Please try again later.");
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <ErrorOutlineIcon color="error" fontSize="large" />
        <Typography variant="h6" color="error" mt={2}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (!recipe) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading Recipe Details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      {/* Sloped Div for Recipe Information */}
      <Box
        sx={{
          position: "relative",
          background: "#f7f7f7",
          padding: "2rem",
          borderRadius: "8px",
          clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0 90%)",
          mb: 4,
        }}
      >
        <Grid container spacing={2}>
          {/* Recipe Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={recipe.image || "https://via.placeholder.com/600x400?text=No+Image"}
              alt={recipe.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Grid>

          {/* Recipe Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              {recipe.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Category:</strong> {recipe.category}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Preparation Time:</strong> {recipe.prepTime || "N/A"} minutes
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Rating:</strong>{" "}
              <Rating value={recipe.rating || 0} readOnly precision={0.5} />
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Created By:</strong>{" "}
              <Chip
                avatar={<Avatar>{recipe.createdBy?.name?.[0] || "U"}</Avatar>}
                label={recipe.createdBy?.name || "Unknown User"}
                variant="outlined"
              />
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Ingredients and Steps */}
      <Grid container spacing={4}>
        {/* Ingredients */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
            }}
          >
            {recipe.ingredients.map((ingredient, index) => (
              <Chip key={index} label={ingredient} variant="outlined" />
            ))}
          </Box>
        </Grid>

        {/* Steps */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <List sx={{ paddingLeft: "1rem" }}>
            {recipe.instructions.map((instruction, index) => (
              <ListItem
                key={index}
                sx={{
                  background: "#f0f0f0",
                  marginBottom: "0.5rem",
                  borderRadius: "8px",
                  padding: "1rem",
                }}
              >
                <ListItemText primary={` ${instruction}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Recipe;
