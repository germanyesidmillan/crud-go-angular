package controller

import (
	"echo-server/db"
	"echo-server/models"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GET ALL CITIES
func GetCities(c echo.Context) error {
	var cities []models.City

	result := db.DB.Preload("Department").Find(&cities)
	//result := db.DB.Find(&cities)

	if result.Error != nil {
		fmt.Print(result.Error)
	}

	return c.JSON(http.StatusOK, cities)

}

// GET ONE CITY
func GetCity(c echo.Context) error {
	var city models.City
	id := c.Param("id")

	fmt.Println("get city: " + id)

	result := db.DB.First(&city, id)

	if result.Error != nil {
		return result.Error
	}

	if city.ID == 0 {
		return c.JSON(http.StatusNotFound, "Ciudad no existe")
	}

	return c.JSON(http.StatusOK, city)
}

// GET CITIES BY DEPARTMENT
func GetCitiesDpto(c echo.Context) error {
	var city []models.City
	id := c.Param("id")

	fmt.Println("get city: " + id)

	result := db.DB.Where("department_id = ?", id).Find(&city)
	//result := db.DB.Where("departamento_id = ?", id).First(&city, id)

	if result.Error != nil {
		return result.Error
	}

	/*if city.ID == 0 {
		return c.JSON(http.StatusNotFound, "Ciudad no existe")
	}*/

	return c.JSON(http.StatusOK, city)
}

// CREATE CITY
func CreateCity(c echo.Context) error {

	var city models.City

	if err := c.Bind(&city); err != nil {
		return err
	}

	result := db.DB.Create(&city)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "Error server")
	}

	return c.JSON(http.StatusOK, city)
}

// UPDATE CITY
func UpdateCity(c echo.Context) error {
	/*var city models.City
	id := c.Param("id")

	res := db.DB.First(&city, id)

	if res.Error != nil {
		return c.JSON(http.StatusNotFound, "Ciudad no encontrada")
	}*/

	return c.JSON(http.StatusOK, "Ciudad aptualizada")
}

// DELETE CITY
func DeleteCity(c echo.Context) error {
	/*var city models.City
	id := c.Param("id")

	res := db.DB.First(&city, id)

	if res.Error != nil {
		fmt.Print(res.Error)
	}

	result := db.DB.Delete(&city, id)

	if result.Error != nil {
		fmt.Print(result.Error)
	}*/

	return c.JSON(http.StatusNoContent, "Ciudad eliminada")
}
