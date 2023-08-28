import type { Message } from "../../../../dist/lib/es6";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
export const toast = (message: Message) => {

        let background: string
		if (message.code.startsWith('E')) {
			background ='linear-gradient(to right, hsl(var(--er)), #ff0038)'
		}
		else {
			'linear-gradient(to right, hsl(var(--in)), hsl(var(--su)))'
		}
			Toastify({
				text: `${message.code}: ${message.message}. ${message.detail}`,
				duration: 3000,
				newWindow: true,
				close: true,
				gravity: 'top', // `top` or `bottom`
				position: 'left', // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background
				},
			}).showToast();
}
