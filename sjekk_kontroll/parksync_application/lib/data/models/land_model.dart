class Land {
  final String code;
  final String country;
  final String? flag;
  final int rank;

  Land({required this.code, required this.country, required this.flag, required this.rank});

  factory Land.fromJsonFile(Map data) {
    return Land(
        code: data['alpha2'].toString().toUpperCase(),
        country: data['name'],
        flag: 'assets/countries_data/flags/${data['alpha2']}.png',
        rank: data['rank'] ?? 0);
  }

  factory Land.fromVlJson(Map data) {
    return Land(code: data['code'], country: data['country'], flag: data['flag'] ?? '', rank: data['rank'] ?? 0);
  }

  Map toJson() {
    return {'code': code, 'country': country, 'flag': flag, 'rank': rank};
  }
}
