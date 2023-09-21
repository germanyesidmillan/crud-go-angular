package main

import (
	"echo-server/db"
	"echo-server/routes"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/pkg/errors"
	//"github.com/labstack/echo/v4/middleware"
)

// Handler
/*func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}*/

func validar(next echo.HandlerFunc) echo.HandlerFunc {

	return func(c echo.Context) error {
		fmt.Println("validacion")
		//return next(c)
		return errors.New("error")

	}

}

func handleCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Establece los encabezados CORS para permitir cualquier origen
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Continúa con el siguiente manejador en la cadena
		next.ServeHTTP(w, r)
	})
}

func main() {
	fmt.Println("hola mundo")

	//BD
	db.DBConnection()

	//CREACION DE LA BASE DE DATOS
	//db.DB.AutoMigrate(models.User{})
	//db.DB.AutoMigrate(models.City{})
	//db.DB.AutoMigrate(models.Department{})

	// Echo instance
	e := echo.New()
	e.Use(middleware.CORS())

	routes.Rutas(e)
	// Middleware
	//e.Use(middleware.Logger())
	//e.Use(middleware.Recover())

	// Routes
	//e.GET("/", hello)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))

}
