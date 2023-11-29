export default function leadZero(num, size = 2) {
	num = num.toString();
	while (num.length < size) num = "0" + num;
	return num;
}