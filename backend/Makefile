PYTHON = python

REQUIREMENTS = requirements.txt

APP = ./fast-api/run.py

all: install run

install:
	$(PYTHON) -m pip install -r $(REQUIREMENTS)
run:
	$(PYTHON) $(APP)
clean:
	rm -rf __pycache__

help:
	@echo "Makefile targets:"
	@echo "  all     - Install dependencies and run the application"
	@echo "  install - Install dependencies"
	@echo "  run     - Run the application"
	@echo "  clean   - Clean up generated files"
	@echo "  help    - Show this help message"