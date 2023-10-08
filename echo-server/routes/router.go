package routes

import (
	"echo-server/controller"

	"github.com/labstack/echo/v4"
)

func Rutas(e *echo.Echo) {

	//public := e.Group("")
	//protected := e.Group("")

	//public.GET("/hello", H )

	e.GET("/hello", controller.Hello)
	e.GET("/", controller.GetRecords)
	e.GET("/:id", controller.GetRecordId)
	e.POST("/", controller.UpdateRecordId)
	e.PUT("/:id", controller.InsertRecord)
	e.DELETE("/:id", controller.DeleteRecord)

	//RUTAS USUARIO
	e.GET("/users", controller.GetUsers)
	e.GET("/user/:id", controller.GetUser)
	e.GET("/userByNumId/:id", controller.GetUserByNumId)
	e.GET("/userDepartment", controller.GetUsersDepartment)
	e.POST("/user", controller.CreateUser)
	e.PUT("/user/:id", controller.UpdateUser)
	e.DELETE("/user/:id", controller.DeleteUser)

	//RUTAS CIUDADES
	e.GET("/city", controller.GetCities)
	e.GET("/city/:id", controller.GetCity)
	e.GET("/cityDpto/:id", controller.GetCitiesDpto)
	e.POST("/city", controller.CreateCity)
	e.PUT("/city/:id", controller.UpdateCity)
	e.DELETE("/city/:id", controller.DeleteCity)

	//RUTAS DEPARTAMENTOS
	e.GET("/departments", controller.GetDepartments)
	e.GET("/department/:id", controller.GetDepartment)
	e.POST("/department", controller.CreateDepartment)
	e.PUT("/department/:id", controller.UpdateDepartment)
	e.DELETE("/department/:id", controller.DeleteDepartment)

	//DESCARGAR ARCHIVO
	e.POST("/download", controller.ExcelFile)

}
