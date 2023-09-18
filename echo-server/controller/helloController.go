package controller

import (
	"echo-server/db"
	"echo-server/models"

	//"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Handler
func Hello(c echo.Context) error {

	var products []models.Products

	db.DB.Unscoped().Find(&products)

	//fmt.Println(products)

	return c.JSON(http.StatusOK, products)
}

func GetRecords(c echo.Context) error {

	var products []models.Products

	db.DB.Unscoped().Find(&products)

	//fmt.Println(products)

	return c.JSON(http.StatusOK, products)
}

func GetRecordId(c echo.Context) error {

	var products []models.Products

	db.DB.Unscoped().Find(&products)

	//fmt.Println(products)

	return c.JSON(http.StatusOK, products)
}

func UpdateRecordId(c echo.Context) error {

	var products []models.Products

	db.DB.Unscoped().Find(&products)

	//fmt.Println(products)

	return c.JSON(http.StatusOK, products)
}

func InsertRecord(c echo.Context) error {

	var products []models.Products

	db.DB.Unscoped().Find(&products)

	//fmt.Println(products)

	return c.JSON(http.StatusOK, products)
}

func DeleteRecord(c echo.Context) error {

	var products []models.Products

	db.DB.Unscoped().Find(&products)

	//fmt.Println(products)

	return c.JSON(http.StatusOK, products)
}
