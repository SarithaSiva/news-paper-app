// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';

const Home = () => {
  // Sample news data
  const navigate = useNavigate();
  const featuredNews = {
    title: 'Breaking News: Major Event Happens Today',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel sapien ac nisi tincidunt tincidunt.',
    image: 'https://via.placeholder.com/800x400',
  };

  const articles = [
    {
      id: 1,
      title: 'Article 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      title: 'Article 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      title: 'Article 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  return (
    <div>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <MenuIcon sx={{ marginRight: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News App
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login')}>
          Login
          </Button>
          <Button color="inherit" onClick={() => navigate('/Register')}>
          Register
          </Button>
          </Toolbar>
          </AppBar>
        

      {/* Featured News Section */}
      <Container sx={{ marginTop: 4 }}>
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={featuredNews.image}
            alt={featuredNews.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {featuredNews.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {featuredNews.description}
            </Typography>
          </CardContent>
        </Card>
      </Container>

      {/* Articles Grid */}
      <Container sx={{ marginTop: 4, marginBottom: 4 }}>
        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={article.image}
                  alt={article.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <AppBar position="static" sx={{ top: 'auto', bottom: 0, marginTop: 4 }}>
        <Toolbar>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            © 2023 News App
          </Typography>
          <SearchIcon sx={{ marginRight: 2 }} />
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Home;