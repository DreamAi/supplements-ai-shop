#!/bin/bash
# simple cron-run retraining
cd $(dirname $0)
python train.py features.csv customer_model_$(date +%Y%m%d).joblib
# push to model registry / notify backend to swap model
