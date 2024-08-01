import pandas as pd


def group_dataframe(dataframe: pd.DataFrame, group_by: str):
    grouped_list = []
    grouped = dataframe.groupby(group_by).apply(
        lambda obj: obj.to_dict(orient="records")
    )

    for item in grouped:
        grouped_list.append(*item)

    return grouped_list


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
