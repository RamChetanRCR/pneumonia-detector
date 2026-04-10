import tensorflow as tf
import cv2
import numpy as np
import traceback
import os

def predict_pneumonia(image_path):
    """
    Predict pneumonia using a pre-trained TensorFlow model with comprehensive error handling
    """
    try:
        # Verify model file exists
        if not os.path.exists('pneumonia_detection_model.h5'):
            raise FileNotFoundError("Model file 'pneumonia_detection_model.h5' not found")

        # Load the saved model
        model = tf.keras.models.load_model('pneumonia_detection_model.h5')

        # Verify image exists
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image file {image_path} not found")

        # Read image
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError(f"Unable to read image {image_path}")

        # Resize and preprocess
        img_resized = cv2.resize(img, (256, 256))
        img_array = img_resized.astype(np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predict
        prediction = model.predict(img_array)
        pneumonia_probability = float(prediction[0][0])
        has_pneumonia = pneumonia_probability > 0.5

        return {
            'has_pneumonia': has_pneumonia,
            'probability': pneumonia_probability,
            'details': {
                'diagnosis': 'Pneumonia Detected' if has_pneumonia else 'No Pneumonia',
                'prognosis': 'Potential respiratory infection' if has_pneumonia else 'Normal chest condition',
                'treatment': 'Consult doctor, potential antibiotics' if has_pneumonia else 'Regular health monitoring'
            }
        }

    except Exception as e:
        print(f"Error in prediction: {e}")
        print(traceback.format_exc())
        return {
            'error': str(e),
            'has_pneumonia': False,
            'probability': 0.0,
            'details': {
                'diagnosis': 'Unable to process',
                'prognosis': 'Error in image analysis',
                'treatment': 'Manual medical consultation recommended'
            }
        }