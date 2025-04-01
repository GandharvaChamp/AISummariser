import sys
import os
import subprocess
import platform

def get_venv_details():
    """Scans and prints details about the Python virtual environment."""

    print("Virtual Environment Details:\n")

    # Python Version
    print(f"Python Version: {sys.version}")

    # Operating System
    print(f"Operating System: {platform.system()} {platform.release()}")

    # Virtual Environment Path
    venv_path = sys.prefix
    print(f"Virtual Environment Path: {venv_path}")

    # Installed Packages
    print("\nInstalled Packages:")
    try:
        result = subprocess.run([sys.executable, "-m", "pip", "freeze"], capture_output=True, text=True, check=True)
        packages = result.stdout.splitlines()
        for package in packages:
            print(f"  - {package}")
    except subprocess.CalledProcessError as e:
        print(f"  Error retrieving package list: {e}")

    # Check if Conda is used.
    if "conda" in venv_path.lower():
        print("\nThis appears to be a Conda environment.")

        try:
            result = subprocess.run(["conda", "info", "--envs"], capture_output=True, text=True, check=True)
            conda_envs = result.stdout
            print("\nConda Environments:")
            print(conda_envs)

            result = subprocess.run(["conda", "list"], capture_output=True, text=True, check=True)
            conda_packages = result.stdout
            print("\nConda Packages:")
            print(conda_packages)

        except subprocess.CalledProcessError as e:
            print(f"  Error retrieving Conda information: {e}")

    # Check for .env file
    env_file = os.path.join(os.getcwd(), ".env")
    if os.path.exists(env_file):
        print("\n.env File Variables:")
        try:
            with open(env_file, "r") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        key = line.split("=", 1)[0].strip()
                        print(f"  - {key}")
        except IOError as e:
            print(f"  Error reading .env file: {e}")

    # Check for docker files
    dockerfile_exists = os.path.exists("Dockerfile")
    dockercompose_exists = os.path.exists("docker-compose.yml")

    print("\nDocker Related Files:")
    print(f"  Dockerfile: {dockerfile_exists}")
    print(f"  docker-compose.yml: {dockercompose_exists}")

if __name__ == "__main__":
    get_venv_details()