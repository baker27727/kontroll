package no.parksync.parksync_application

class PrinterConstants {
    companion object {
        val channel = "sjekk_printer_channel"

        val getPrinterStatusCommand = "get_printer_status"
        val printerConnectCommand = "connect_printer"
        val printerDisconnectCommand = "disconnect_printer"
        val getConnectionState = "get_connection_state"

        val checkBluetoothAdapter = "check_bluetooth_adapter"
        val printViolationTicket = "print_violation_ticket"
        val searchBluetoothDevices = "search_bluetooth_devices"
        val getPairedBluetoothDevices = "get_paired_bluetooth_devices"
    }
}