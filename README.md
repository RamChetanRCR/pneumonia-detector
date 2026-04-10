# Pneumonia Detector 🫁

A deep learning web application that detects pneumonia from chest X-ray images using a CNN model built with PyTorch, served via a Flask REST API, and visualized through a React frontend.

## Demo
Upload a chest X-ray → Get instant pneumonia/normal classification with confidence score.

## Tech Stack
- **Model:** PyTorch (CNN - Custom Architecture)
- **Backend:** Flask (REST API)
- **Frontend:** React
- **Dataset:** Chest X-Ray Images (Pneumonia) — Kaggle

## Model Architecture
- 3 Convolutional layers with ReLU activation and MaxPooling
- Fully connected layers with Dropout for regularization
- Binary classification output (Pneumonia / Normal)
- Achieved **92% accuracy** on test set

## How It Works
1. User uploads chest X-ray image via React frontend
2. Image is sent to Flask API endpoint
3. PyTorch model preprocesses and runs inference
4. Prediction + confidence score returned and displayed

## Setup & Run
```bash
# Install dependencies
pip install -r requirements.txt

# Run Flask backend
python app.py

# Run React frontend
cd my-react-app
npm install
npm start
```

## Results
| Metric | Score |
|--------|-------|
| Accuracy | 92% |
| Precision | 91% |
| Recall | 93% |
