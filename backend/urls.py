baseURL = "https://api.deezer.com/"
searchURL = f"{baseURL}search"


def generate_image_url(md5_image: str, size_int: int = 250):
    size = str(size_int)
    return f"https://e-cdns-images.dzcdn.net/images/cover/{md5_image}/{size}x{size}-000000-80-0-0.jpg"
