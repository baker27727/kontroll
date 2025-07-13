class User {
  final int id;
  final String pnid;
  final String name;

  User({required this.pnid, required this.name, required this.id}); 

  factory User.fromJson(Map json) {
    return User(
      id: json['id'],
      pnid: json['pnid'],
      name: json['name'],
    );
  }

  Map toJson() {
    return {'id': id, 'pnid': pnid, 'name': name};
  }
}
