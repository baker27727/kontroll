import 'package:parksync_application/core/constants/app_constants.dart';
import 'package:parksync_application/core/helpers/logger.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  static SocketService? _instance;
  final IO.Socket socket = IO.io(baseUrl, <String, dynamic>{
    'transports': ['websocket'],
    'autoConnect': false,
  });

  SocketService._();

  static SocketService get instance {
    _instance ??= SocketService._();
    return _instance!;
  }

  Future<void> initSocket() async {

    socket.connect();

    socket.onConnect((_) {
      logger.d('connected');
    });
  }

  Future<void> disconnectSocket() async {
    socket.disconnect();
  }
}