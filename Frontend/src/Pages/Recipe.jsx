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
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Recipe = () => {
  const { id } = useParams(); // Recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in local storage
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch recipe details
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeResponse = await axios.get(`http://localhost:3000/recipes/${id}`);
        setRecipe(recipeResponse.data);

        if (userId) {
          const favoriteResponse = await axios.get(`http://localhost:3000/favorites/user/${userId}`);
          const isFav = favoriteResponse.data.some((fav) => fav._id === id);
          setIsFavorite(isFav);

          const ratingResponse = await axios.get(`http://localhost:3000/ratings/recipe/${id}`);
          const userSpecificRating = ratingResponse.data.averageRating || 0;
          setUserRating(userSpecificRating);
        }
      } catch (err) {
        console.error("Error fetching recipe data:", err);
        setError("Failed to load recipe details. Please try again later.");
      }
    };

    fetchRecipe();
  }, [id, userId]);

  const toggleFavorite = async () => {
    try {
      await axios.post("http://localhost:3000/favorites/toggle", { userId, recipeId: id });
      setIsFavorite((prev) => !prev);
      setSnackbarMessage(isFavorite ? "Removed from favorites" : "Added to favorites");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error updating favorite status:", err);
      setError("Failed to update favorite status. Please try again.");
    }
  };

  const handleRatingChange = async (newRating) => {
    try {
      await axios.post("http://localhost:3000/ratings/rate", { userId, recipeId: id, rating: newRating });
      setUserRating(newRating);
    } catch (err) {
      console.error("Error updating rating:", err);
      setError("Failed to update rating. Please try again.");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
      <Grid container spacing={2}>
        {/* Recipe Image */}
        <Grid item xs={12} md={6} sx={{ position: "relative" }}>
          <Box
            component="img"
            src={recipe.image || "https://via.placeholder.com/600x400?text=No+Image"}
            alt={recipe.title}
            sx={{
              width: "400px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px",
              display: "block",
              margin: "0 auto",
            }}
          />
          {/* Favorite Button */}
          {userId && (
            <IconButton
              onClick={toggleFavorite}
              color={isFavorite ? "error" : "default"}
              sx={{
                position: "absolute",
                top: "30px",
                right: "10px",
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "50%",
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          )}
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
          {userId && (
            <Typography variant="subtitle1" gutterBottom>
              <strong>Rating:</strong>{" "}
              <Rating
                value={userRating}
                precision={0.5}
                onChange={(e, newValue) => handleRatingChange(newValue)}
              />
            </Typography>
          )}
          <Typography variant="subtitle1" gutterBottom>
            <strong>Created By:</strong>{" "}
            <Chip
              avatar={<Avatar>{recipe.createdBy?.name?.[0] || "U"}</Avatar>}
              label={recipe.createdBy?.name || "Unknown User"}
              variant="outlined"
              sx={recipe.createdBy?.role === 'masterChef' ? { border: '2px solid red', background: 'orange' } : {}}
            />
          </Typography>
        </Grid>
      </Grid>

      {/* Ingredients and Steps */}
      <Grid container spacing={4} mt={4}>
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

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Recipe;
