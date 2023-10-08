package controller

import (
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/xuri/excelize/v2"
)

func ExcelFile(c echo.Context) error {

	fmt.Println("entro al controller")
	// Crear un nuevo libro de Excel
	f := excelize.NewFile()

	// Crear una hoja de cálculo
	sheetName := "Sheet1"
	index, e := f.NewSheet(sheetName)

	fmt.Println(index)
	fmt.Println(e)

	// Agregar datos a la hoja de cálculo
	data := [][]interface{}{
		{"Nombre", "Edad"},
		{"Alice", 30},
		{"Bob", 25},
		{"Charlie", 35},
	}

	for rowIndex, row := range data {
		for colIndex, cellValue := range row {
			fmt.Println(rowIndex)
			fmt.Println(colIndex)
			cellName := toAlphaString(colIndex+1) + fmt.Sprintf("%d", rowIndex+1)
			f.SetCellValue(sheetName, cellName, cellValue)
		}
	}

	// Guardar el libro de Excel en un archivo temporal
	tempFileName := "output.xlsx"
	if err := f.SaveAs(tempFileName); err != nil {
		return c.String(http.StatusInternalServerError, "Error al guardar el archivo Excel")
	}
	defer os.Remove(tempFileName) // Eliminar el archivo temporal después de usarlo

	// Configurar la respuesta HTTP para descargar el archivo Excel
	c.Response().Header().Set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	c.Response().Header().Set("Content-Disposition", "attachment; filename=output.xlsx")

	// Abre el archivo Excel
	file, err := os.Open(tempFileName)
	if err != nil {
		return c.String(http.StatusInternalServerError, "No se pudo abrir el archivo Excel")
	}
	defer file.Close()

	// Copiar el contenido del archivo al cuerpo de la respuesta
	_, err = io.Copy(c.Response().Writer, file)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Error al escribir la respuesta")
	}

	return nil

}

func toAlphaString(colIndex int) string {
	colName := ""
	for {
		if colIndex <= 0 {
			break
		}
		colIndex--
		colName = string('A'+colIndex%26) + colName
		colIndex /= 26
	}
	return colName
}
