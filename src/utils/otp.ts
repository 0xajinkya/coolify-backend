export function generateStrongOTP() {
	const otpLength = 6;
	const otpDigits = new Array(otpLength);
	for (let i = 0; i < otpLength; i++) {
		otpDigits[i] = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % 10);
	}
	if (otpDigits[0] === 0) {
		otpDigits[0] = 1;
	}
	const otp = otpDigits.join("");
	return otp;
}
