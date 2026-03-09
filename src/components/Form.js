import React, { useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { RequestHandlerContext } from "../utilities/requestHandler";
import AppText from "./Text";
import TextInput from "./TextInput";
import Button from "./Button";
import Switch from "./Switch";

const SUPPORTED_TYPES = [
	"text",
	"number",
	"email",
	"file",
	"image",
	"document",
	"password",
	"textarea",
	"select",
	"multi-select",
	"checkbox",
	"radio",
];

const normalizeOptions = (options) => {
	if (!Array.isArray(options)) {
		return [];
	}

	return options
		.map((option) => {
			if (typeof option === "string" || typeof option === "number") {
				return { label: String(option), value: option };
			}

			if (option && typeof option === "object") {
				return {
					label: option.label || String(option.value || ""),
					value: option.value,
				};
			}

			return null;
		})
		.filter((option) => option && option.value !== undefined);
};

const getInitialValue = (field) => {
	if (field.default !== undefined) {
		return field.default;
	}

	if (field.type === "multi-select") {
		return [];
	}

	if (field.type === "checkbox") {
		return false;
	}

	return "";
};

const Form = ({
	schema = [],
	title = "Form",
	submitLabel = "Submit",
	submitUrl,
	method = "POST",
	headers,
	initialValues = {},
	onSubmit,
	onSuccess,
	onError,
	style,
}) => {
	const { paperTheme } = useContext(ThemeContext);
	const requestContext = useContext(RequestHandlerContext);
	const colors = paperTheme.colors;

	const [values, setValues] = useState({});
	const [fieldErrors, setFieldErrors] = useState({});
	const [schemaError, setSchemaError] = useState("");
	const [submitError, setSubmitError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const parsedFields = useMemo(() => {
		if (!Array.isArray(schema)) {
			return [];
		}

		return schema.filter((field) => field && field.name && SUPPORTED_TYPES.includes(field.type));
	}, [schema]);

	useEffect(() => {
		if (!Array.isArray(schema)) {
			setSchemaError("Schema must be an array of field objects.");
		} else {
			setSchemaError("");
		}
	}, [schema]);

	useEffect(() => {
		const nextValues = {};

		parsedFields.forEach((field) => {
			if (initialValues[field.name] !== undefined) {
				nextValues[field.name] = initialValues[field.name];
			} else {
				nextValues[field.name] = getInitialValue(field);
			}
		});

		setValues((previousValues) => ({ ...nextValues, ...previousValues }));
	}, [parsedFields]);

	const setValue = (name, value) => {
		setValues((previousValues) => ({
			...previousValues,
			[name]: value,
		}));

		if (fieldErrors[name]) {
			setFieldErrors((previousErrors) => ({
				...previousErrors,
				[name]: "",
			}));
		}
	};

	const validateFields = () => {
		const nextErrors = {};

		parsedFields.forEach((field) => {
			if (field.hidden || !field.required) {
				return;
			}

			const value = values[field.name];
			const isEmptyArray = Array.isArray(value) && value.length === 0;
			const isEmptyValue = value === "" || value === null || value === undefined;
			const isUnchecked = field.type === "checkbox" && value !== true;

			if (isEmptyArray || isEmptyValue || isUnchecked) {
				nextErrors[field.name] = `${field.label || field.name} is required.`;
			}
		});

		setFieldErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	};

	const handleSubmit = async () => {
		setDidSubmit(false);
		setSubmitError("");

		if (!validateFields()) {
			return;
		}

		const payload = {};
		parsedFields.forEach((field) => {
			payload[field.name] = values[field.name];
		});

		try {
			setIsSubmitting(true);

			if (typeof onSubmit === "function") {
				await onSubmit(payload, requestContext);
			} else if (requestContext?.fetchData && submitUrl) {
				await requestContext.fetchData(submitUrl, {
					method,
					headers: {
						"Content-Type": "application/json",
						...(headers || {}),
					},
					body: JSON.stringify(payload),
				});
			} else {
				throw new Error("Provide onSubmit, or submitUrl with RequestHandlerProvider.");
			}

			setDidSubmit(true);
			if (typeof onSuccess === "function") {
				onSuccess(payload);
			}
		} catch (error) {
			const message = error?.message || "Unable to submit the form.";
			setSubmitError(message);
			if (typeof onError === "function") {
				onError(error);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const renderSelectableOptions = (field, multiple = false) => {
		const options = normalizeOptions(field.options);

		return (
			<View style={styles.optionList}>
				{options.map((option) => {
					const currentValue = values[field.name];
					const isSelected = multiple
						? Array.isArray(currentValue) && currentValue.includes(option.value)
						: currentValue === option.value;

					return (
						<TouchableOpacity
							key={`${field.name}-${String(option.value)}`}
							style={[
								styles.optionChip,
								{
									borderColor: isSelected ? colors.primary : colors.outline || colors.border,
									backgroundColor: isSelected
										? colors.primaryContainer || colors.surfaceAlt
										: colors.elevation?.level1 || colors.surface,
								},
							]}
							activeOpacity={0.8}
							onPress={() => {
								if (multiple) {
									const source = Array.isArray(currentValue) ? currentValue : [];
									const nextValue = source.includes(option.value)
										? source.filter((value) => value !== option.value)
										: [...source, option.value];
									setValue(field.name, nextValue);
								} else {
									setValue(field.name, option.value);
								}
							}}
						>
							<AppText
								variant="body2"
								style={{ color: isSelected ? colors.onPrimaryContainer || colors.onSurface : colors.onSurface }}
							>
								{option.label}
							</AppText>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	const renderField = (field) => {
		if (field.hidden) {
			return null;
		}

		const label = field.label || field.name;
		const errorText = fieldErrors[field.name];

		if (field.type === "checkbox") {
			return (
				<View key={field.name} style={styles.fieldBlock}>
					<Switch
						value={Boolean(values[field.name])}
						onValueChange={(value) => setValue(field.name, value)}
						label={label}
					/>
					{errorText ? <AppText variant="caption" style={{ color: colors.error }}>{errorText}</AppText> : null}
				</View>
			);
		}

		if (field.type === "select") {
			return (
				<View key={field.name} style={styles.fieldBlock}>
					<AppText variant="label" style={styles.label}>{label}</AppText>
					{renderSelectableOptions(field, false)}
					{errorText ? <AppText variant="caption" style={{ color: colors.error }}>{errorText}</AppText> : null}
				</View>
			);
		}

		if (field.type === "multi-select") {
			return (
				<View key={field.name} style={styles.fieldBlock}>
					<AppText variant="label" style={styles.label}>{label}</AppText>
					{renderSelectableOptions(field, true)}
					{errorText ? <AppText variant="caption" style={{ color: colors.error }}>{errorText}</AppText> : null}
				</View>
			);
		}

		if (field.type === "radio") {
			return (
				<View key={field.name} style={styles.fieldBlock}>
					<AppText variant="label" style={styles.label}>{label}</AppText>
					{renderSelectableOptions(field, false)}
					{errorText ? <AppText variant="caption" style={{ color: colors.error }}>{errorText}</AppText> : null}
				</View>
			);
		}

		const isTextArea = field.type === "textarea";
		const isPassword = field.type === "password";
		const keyboardType =
			field.type === "email"
				? "email-address"
				: field.type === "number"
					? "numeric"
					: "default";

		const placeholder =
			field.placeholder ||
			(field.type === "file" || field.type === "image" || field.type === "document"
				? "Paste file URI or remote URL"
				: "");

		return (
			<TextInput
				key={field.name}
				label={label}
				placeholder={placeholder}
				value={values[field.name] === undefined || values[field.name] === null ? "" : String(values[field.name])}
				onChangeText={(text) => setValue(field.name, text)}
				secureTextEntry={isPassword}
				keyboardType={keyboardType}
				multiline={isTextArea}
				numberOfLines={isTextArea ? 4 : undefined}
				error={Boolean(errorText)}
				errorText={errorText}
			/>
		);
	};

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: colors.elevation?.level1 || colors.surface,
					borderColor: colors.outline || colors.border,
				},
				style,
			]}
		>
			<AppText variant="titleSmall">{title}</AppText>
			{/* <AppText variant="body2" style={[styles.subtitle, { color: colors.onSurfaceVariant || colors.textMuted || colors.onSurface }]}></AppText> */}

			{schemaError ? (
				<AppText variant="body2" style={{ color: colors.error }}>
					{schemaError}
				</AppText>
			) : (
				parsedFields.map((field) => renderField(field))
			)}

			{submitError ? (
				<AppText variant="body2" style={[styles.statusText, { color: colors.error }]}>
					{submitError}
				</AppText>
			) : null}

			{!submitError && requestContext?.error ? (
				<AppText variant="body2" style={[styles.statusText, { color: colors.error }]}>Request failed. Please try again.</AppText>
			) : null}

			{didSubmit ? (
				<AppText variant="body2" style={[styles.statusText, { color: colors.success }]}>Form submitted successfully.</AppText>
			) : null}

			<Button
				title={submitLabel}
				onPress={handleSubmit}
				loading={isSubmitting || Boolean(requestContext?.loading)}
				style={styles.submitButton}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	subtitle: {
		marginTop: 2,
		marginBottom: 10,
	},
	fieldBlock: {
		marginTop: 8,
	},
	label: {
		marginBottom: 6,
	},
	optionList: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	optionChip: {
		borderWidth: 1,
		borderRadius: 999,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	statusText: {
		marginTop: 10,
	},
	submitButton: {
		marginTop: 12,
	},
});

export default Form;


