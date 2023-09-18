package db

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DBConnection() {
	var error error
	dbHost := os.Getenv("host")
	dbUser := os.Getenv("user")
	dbPassword := os.Getenv("password")
	dbName := os.Getenv("dbname")
	dbPort := os.Getenv("port")

	DSN := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s", dbHost, dbUser, dbPassword, dbName, dbPort)

	DB, error = gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if error != nil {
		log.Fatal(error)
	} else {
		log.Println("DB connected")
	}

}

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file : %v", err)
	}
}
