import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGalery } from "../components"

export const NoteView = () => {
  return (
    <Grid 
        container
        direction="row"
        justifyContent="space-between"
        sx={{ mb:1 }}
        alignItems="center"
    >
        <Grid item>
            <Typography 
                fontSize={ 39 }
                fontWeight="light"

            >
                20 de Julio de 2022
            </Typography>
        </Grid>
        <Grid item>
            <Button color="primary" sx={{ padding:2 }}>
                <SaveOutlined sx={{ fontSize:30, mr:1}}/>
                Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}

            />
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió hoy?"
                sx={{ border: 'none', mb: 1 }}
                minRows={ 5 }

            />
        </Grid>
        {/* Galería de imágenes */}
        <ImageGalery />
    </Grid>
  )
}
