.DEFAULT_GOAL := help

# All devstack targets are "PHONY" in that they do not name actual files.
# Thus, all non-parameterized targets should be added to this declaration.
.PHONY: help provision build up logs attach shell stop requirements upgrade

up:
	docker build . -t synergy-api-server -f Dockerfile
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

stop:
	docker-compose stop

logs:  ## View logs from running containers.
	docker-compose logs  -f  synergy-api-docker
	