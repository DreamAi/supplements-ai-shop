import pandas as pd
import numpy as np

def build_features(orders_df):
    # shop signals: recency, freq, monetary
    orders_df['order_date'] = pd.to_datetime(orders_df['order_date'])
    snapshot = pd.Timestamp.today()
    rfm = orders_df.groupby('customer_id').agg({
        'order_date': lambda x: (snapshot - x.max()).days,
        'order_id': 'nunique',
        'value': 'sum'
    }).rename(columns={'order_date':'recency_days','order_id':'frequency','value':'monetary'})
    # more features: avg_cart_size, categories_preference, returns_rate
    return rfm.reset_index()
