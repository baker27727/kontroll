class CustomHeaders {
  static Map<String, String> headers = {};
  CustomHeaders();

  CustomHeaders makeJson() {
    headers.addAll({'Content-Type': 'application/json; charset=utf-8'});
    return this;
  }

  CustomHeaders add(String key, String value) {
    headers.addAll({key: value});
    return this;
  }

  static Map<String, String> withToken(String token) {
    headers.addAll({'token': token, 'Content-Type': 'application/json; charset=utf-8'});
    return headers;
  }

  Map<String, String> finish() {
    return headers;
  }
}
