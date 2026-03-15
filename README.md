
# Base App

Welcome to my Base App! This project is built using Expo, a framework for building React Native applications.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (>= 12.x)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Clone the Repository

```bash
git clone https://github.com/noahschwagele/base-app.git
```

### Navigate to the Project Directory

```bash
cd base-app
```

### Install Dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

## Running the App

Now that you have cloned the repository and installed the dependencies, you can run the app using Expo.

### Start the Expo Development Server

```bash
expo start
```

This will open the Expo Developer Tools in your default web browser. You can then choose to run the app on an emulator or scan the QR code with the Expo Go app on your mobile device.

For more details on running Expo projects, refer to the [Expo documentation](https://docs.expo.dev/get-started/installation/).

## Customize and Build

Feel free to customize the app according to your needs. You can edit the source files in the `src` directory and make any necessary changes.

## Push Notifications and FCM

This app uses `expo-notifications`. If you only use local notifications scheduled on the device, no Firebase setup is required. If you want remote push notifications on Android, you must configure Firebase Cloud Messaging (FCM), even when using Expo push tokens.

### When FCM Is Required

- Local notifications only: FCM is not required.
- Remote push notifications on Android: FCM is required.
- Remote push notifications on iOS: APNs is required.

### Android FCM Setup

1. Create or open a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Add an Android app to that Firebase project.
3. Use this package name exactly for the Android app:

```text
com.noahschwagele.baseapp
```

4. Download the `google-services.json` file from Firebase.
5. Place the file in the project root:

```text
base-app/google-services.json
```

6. Update `app.json` so Expo includes the Firebase config in the native Android build:

```json
{
	"expo": {
		"android": {
			"package": "com.noahschwagele.baseapp",
			"googleServicesFile": "./google-services.json"
		}
	}
}
```

The existing `android.package` value must match the package registered in Firebase.

### Expo and EAS Notes

- This project uses an EAS project ID in `app.json`.
- A development build is required for native push setup changes.
- Expo Go is not enough for validating Android FCM integration.
- After adding `google-services.json`, rebuild the app. A reload will not pick up native config changes.

Example rebuild commands:

```bash
eas build --profile development --platform android
```

or, if you are building locally:

```bash
npx expo run:android
```

### Sending Through Expo Push Service

If the app calls `Notifications.getExpoPushTokenAsync(...)`, Expo still delivers Android pushes through FCM under the hood. Expo push tokens do not remove the need for Firebase on Android.

Useful guides:

- [Expo push notifications setup](https://docs.expo.dev/push-notifications/overview/)
- [Expo FCM credentials guide](https://docs.expo.dev/push-notifications/fcm-credentials/)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)

### Common Failure

If you see an error like this:

```text
Default FirebaseApp is not initialized in this process
```

that usually means one of the following:

- `google-services.json` has not been added.
- `android.googleServicesFile` is missing from `app.json`.
- The Android package name in Firebase does not match `com.noahschwagele.baseapp`.
- The development build was not rebuilt after adding Firebase config.

## CLI Issues

Read the expo eas cli documentation here: [Expo EAS CLI](https://github.com/expo/eas-cli)

## License

This project is licensed under the [MIT License](LICENSE).
