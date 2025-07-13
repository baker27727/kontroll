import 'package:back_button_interceptor/back_button_interceptor.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/utils/sound_utils.dart';
import 'package:parksync_application/presentation/providers/create_ticket_provider.dart';
import 'package:parksync_application/presentation/providers/keyboard_input_provider.dart';
import 'package:parksync_application/presentation/screens/place_home.dart';
import 'package:parksync_application/presentation/screens/plate_result_info.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_button.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text_field.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';


class PlateKeyboardInputScreen extends StatefulWidget {
  static const String route = "plate_keyboard_input_screen";
  const PlateKeyboardInputScreen({super.key});

  @override
  State<PlateKeyboardInputScreen> createState() => _PlateKeyboardInputScreenState();
}

class _PlateKeyboardInputScreenState extends State<PlateKeyboardInputScreen> {
  Future<bool> keyboardInputInterceptor(bool stopDefaultButtonEvent, RouteInfo info) async {
    context.read<KeyboardInputProvider>().clearPlate();

    return false;
  }

  @override
  void initState() {
    super.initState();
    BackButtonInterceptor.add(keyboardInputInterceptor, zIndex: 3);
  }

  @override
  void dispose() {
    BackButtonInterceptor.remove(keyboardInputInterceptor);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          children: [
            const SizedBox(
              height: 36,
            ),
            const KeyboardVisualInput(),
            const SizedBox(
              height: 12,
            ),
            Consumer<KeyboardInputProvider>(
              builder: (BuildContext context, KeyboardInputProvider keyboardInputProvider, Widget? child) {
                if (keyboardInputProvider.mode == KeyboardMode.letters) {
                  return KeyboardLetters();
                }

                return KeyboardDigits();
              },
            ),
            const Spacer(),
            NormalTemplateButton(
              onPressed: () async {
                final keyboardProvider = context.read<KeyboardInputProvider>();
                await context.read<CreateTicketProvider>().getPlateInfo(keyboardProvider.plate);
                await context.read<CreateTicketProvider>().checkCarRegistration(keyboardProvider.plate);
                context.read<CreateTicketProvider>().setCurrentPlateNumber(keyboardProvider.plate);

                if (context.read<CreateTicketProvider>().registeredCar != null) {
                  await playCorrectSound();
                } else {
                  await playWrongSound();
                }
                keyboardProvider.clearPlate();
                Navigator.of(context)
                    .pushNamedAndRemoveUntil(PlateResultInfo.route, (route) => route.settings.name == PlaceHome.route);
              },
              backgroundColor: secondaryColor,
              width: double.infinity,
              text: 'complete'.tr().toUpperCase(),
            )
          ],
        ),
      ),
    );
  }
}

class KeyboardVisualInput extends StatefulWidget {
  const KeyboardVisualInput({super.key});

  @override
  State<KeyboardVisualInput> createState() => _KeyboardVisualInputState();
}

class _KeyboardVisualInputState extends State<KeyboardVisualInput> {
  final TextEditingController visualController = TextEditingController();

  @override
  void dispose() {
    visualController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<KeyboardInputProvider>(
      builder: (BuildContext context, KeyboardInputProvider keyboardInputProvider, Widget? child) {
        visualController.text = keyboardInputProvider.plate;
        return SecondaryTemplateTextField(
          hintText: '',
          disabled: true,
          controller: visualController,
          suffixIcon: const Icon(
            Icons.close,
            size: 30,
            color: dangerColor,
          ),
          onPrefixIconTapped: () {
            Provider.of<KeyboardInputProvider>(context, listen: false).rollback();
          },
          onSuffixIconTapped: () {
            Provider.of<KeyboardInputProvider>(context, listen: false).clearPlate();
          },
          prefixIcon: const Icon(
            Icons.arrow_back,
            size: 30,
            color: Colors.black45,
          ),
        );
      },
    );
  }
}

class KeyboardLetterBox extends StatelessWidget {
  final String letter;
  VoidCallback? customAction;
  KeyboardLetterBox({super.key, required this.letter, this.customAction});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return GestureDetector(
      onTap: customAction ??
          () {
            Provider.of<KeyboardInputProvider>(context, listen: false).updatePlate(letter);
          },
      child: Container(
        width: (size.width - 44) * 0.2,
        height: (size.width - 44) * 0.24,
        alignment: Alignment.center,
        color: primaryColor,
        child: Text(
          letter,
          style: const TextStyle(fontSize: 34, color: Colors.white, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}

class KeyboardLetters extends StatelessWidget {
  KeyboardLetters({super.key});

  final List<String> letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ -".split('');

  @override
  Widget build(BuildContext context) {
    List<KeyboardLetterBox> boxes = letters.map((letter) {
      return KeyboardLetterBox(letter: letter);
    }).toList();

    boxes.add(KeyboardLetterBox(
      letter: "123",
      customAction: () {
        context.read<KeyboardInputProvider>().changeMode(KeyboardMode.digits);
      },
    ));
    return Wrap(
      spacing: 4,
      runSpacing: 4,
      children: [...boxes],
    );
  }
}

class KeyboardDigitBox extends StatelessWidget {
  final String letter;
  VoidCallback? customAction;
  KeyboardDigitBox({super.key, required this.letter, this.customAction});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return GestureDetector(
      onTap: customAction ??
          () {
            Provider.of<KeyboardInputProvider>(context, listen: false).updatePlate(letter);
          },
      child: Container(
        width: (size.width - 24 - 16) * 0.3333,
        height: (size.width - 44) * 0.3333,
        alignment: Alignment.center,
        color: primaryColor,
        child: Text(
          letter,
          style: const TextStyle(fontSize: 40, color: Colors.white, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}

class KeyboardDigits extends StatelessWidget {
  KeyboardDigits({super.key});

  final List<String> letters = "123456789 0".split('');

  @override
  Widget build(BuildContext context) {
    List<KeyboardDigitBox> boxes = letters.map((letter) {
      return KeyboardDigitBox(letter: letter);
    }).toList();

    boxes.add(KeyboardDigitBox(
      letter: "ABC",
      customAction: () {
        context.read<KeyboardInputProvider>().changeMode(KeyboardMode.letters);
      },
    ));
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [...boxes],
    );
  }
}
