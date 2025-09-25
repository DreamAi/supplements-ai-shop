import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

def train_model(feature_csv, out_model_path):
    df = pd.read_csv(feature_csv)
    X = df.drop(columns=['customer_id','label'])
    y = df['label']
    model = RandomForestClassifier(n_estimators=200, random_state=42)
    model.fit(X, y)
    joblib.dump(model, out_model_path)
    print("Model saved to", out_model_path)

if __name__ == '__main__':
    train_model('features.csv','customer_model.joblib')
