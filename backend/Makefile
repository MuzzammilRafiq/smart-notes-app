# Define the Python interpreter
PYTHON = python

# Define the requirements file
REQUIREMENTS = requirements.txt

# Define the main application file
APP = ./fast-api/run.py

# Default target
all: install run

# Install dependencies
install:
	$(PYTHON) -m pip install -r $(REQUIREMENTS)

# Run the application
run:
	$(PYTHON) $(APP)

# Clean up (example target)
clean:
	rm -rf __pycache__

# Help target
help:
	@echo "Makefile targets:"
	@echo "  all     - Install dependencies and run the application"
	@echo "  install - Install dependencies"
	@echo "  run     - Run the application"
	@echo "  clean   - Clean up generated files"
	@echo "  help    - Show this help message"