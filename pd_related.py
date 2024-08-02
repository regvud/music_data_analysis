import pandas as pd
import json


def group_dataframe(dataframe: pd.DataFrame | pd.Series, group_by: str):
    grouped_list = []
    grouped = dataframe.groupby(group_by).apply(
        lambda obj: obj.to_dict(orient="records")
    )

    for item in grouped:
        grouped_list.append(*item)

    return grouped_list


def normalize_keys_in_dict(data: dict):
    normalized_data = {}

    for key, value in data.items():
        parts = key.split(".")
        nd = normalized_data
        for part in parts[:-1]:
            if part not in nd:
                nd[part] = {}
            nd = nd[part]
        nd[parts[-1]] = value

    return normalized_data


def normalize_keys_in_list(data: list):
    normalized_list = []

    for iterable in data:
        normalized_data = {}
        for key, value in iterable.items():
            parts = key.split(".")
            nd = normalized_data
            for part in parts[:-1]:
                if part not in nd:
                    nd[part] = {}
                nd = nd[part]
            nd[parts[-1]] = value
        normalized_list.append(normalized_data)
    return normalized_list


def dataframe_to_dict(dataframe: pd.DataFrame | pd.Series):
    json_df = str(dataframe.to_json(orient="records", lines=True))
    normalized_dict = normalize_keys_in_dict(json.loads(json_df))
    return normalized_dict


def df_column_contains(dataframe: pd.DataFrame, col: str, search_str: str):
    return dataframe[dataframe[col].str.contains(search_str, case=False)]
