rem migrate -source file://Users/rodley/Documents/go/src/icebreaker/icebreaker/db -database postgres://localhost:5432/icebreaker_dev up 1
migrate -source file://. -database postgres://postgres:postgres@localhost:5432/bubbles_dev?sslmode=disable up 1
