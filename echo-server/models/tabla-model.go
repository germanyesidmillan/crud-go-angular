package models

import (
	"gorm.io/gorm"
)

type Products struct {
	gorm.Model
	ErrorCodigo        int64  `gorm:"primary_key; not null" json:"codigo" `
	ErrorDescripcion   string `json:"descripcion"`
	ErrorFechaCreacion string `json:"fecha"`
}

func (Products) TableName() string { return "frontend.it_error" }
