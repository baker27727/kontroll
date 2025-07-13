import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/constants/app_images.dart';
import 'package:parksync_application/core/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/cubits/auth_cubit/auth_cubit.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_button.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text_field.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';
import '../../domain/entities/auth_credentials.dart';
import '../providers/shift_provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _idController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    _idController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
      padding: const EdgeInsets.all(12.0),
      child: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              100.h,
              Image.asset(
                AppImages.kontroll,
                height: 200,
                fit: BoxFit.cover,
              ),
              TemplateHeaderText('Sjekk Kontroll'),
              const SizedBox(height: 48.0),
              Text(
                "login_to_your_account",
                style: TextStyle(
                  color: textColor,
                  fontSize: 24,
                ),
              ).tr(),
              const SizedBox(
                height: 12,
              ),
              NormalTemplateTextFieldWithIcon(
                icon: Icons.perm_identity,
                controller: _idController,
                hintText: 'id'.tr(),
                validator: (value) {
                  if (value != null) {
                    if (value.isEmpty) {
                      return "id_empty_field_message".tr();
                    }

                    return null; 
                  }

                  return null;
                },
              ),
              const SizedBox(
                height: 20,
              ),
              NormalTemplateTextFieldWithIcon(
                icon: Icons.password,
                controller: _passwordController,
                hintText: 'password'.tr(),
                secured: true,
                validator: (value) {
                  if (value != null) {
                    if (value.isEmpty) {
                      return "password_empty_field_message".tr();
                    }

                    return null;
                  }

                  return null;
                },
              ),
              const SizedBox(
                height: 20.0,
              ), 
              Align(
                alignment: Alignment.centerRight,
                child: NormalTemplateButton(
                  text: 'login'.tr().toUpperCase(),
                  onPressed: () async {
                    if (_formKey.currentState != null) {
                      if (_formKey.currentState!.validate()) {
                        AuthCredentials authCredentials = AuthCredentials(
                          pnid: _idController.text, 
                          password: _passwordController.text
                        );

                        await AuthCubit.get(context).loginUser(authCredentials);
                        if(context.mounted){
                          await context.read<ShiftProvider>().startNewShift();
                        }
                      }
                    } else {
                      return;
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    ));
  }
}
