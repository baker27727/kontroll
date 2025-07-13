
import '../entities/auth_credentials.dart';

abstract class IAuthRepository {
  Future<void> loginUser(AuthCredentials authCredentials);
  Future<void> logout();

  Future<void> validateToken();
}
