from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pn import predict_pneumonia

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def detect_pneumonia():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    filename = 'temp_image.jpg'
    file.save(filename)
    
    try:
        result = predict_pneumonia(filename)
        os.remove(filename)  # Clean up temporary file
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)