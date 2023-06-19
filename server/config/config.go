package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"
)

func Connect() (*sql.DB, error) {
	dbDriver := "mysql"
	dbUser := "root"
	dbPass := "ChloeBaker1!"
	dbName := "HulerDays"

	dsn := os.Getenv("MYSQL_WRITEDSN")
	fmt.Println("DSN=", dsn)
	if dsn == "" {
		dsn = dbUser + ":" + dbPass + "@/" + dbName
	}

	db, err := sql.Open(dbDriver, dsn)
	if err != nil {
		return nil, err
	}
	rows, err := db.Query("SELECT id from users WHERE id=1")

	if err != nil {
		log.Print(err)
		return nil, err
	}
	var id sql.NullInt64
	for rows.Next() {
		err = rows.Scan(&id)
		if err != nil {
			return nil, err

		}

	}
	return db, nil
}
