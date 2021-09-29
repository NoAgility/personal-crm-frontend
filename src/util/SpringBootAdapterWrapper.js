import SpringBootAdapter from './SpringBootAdapter';
const SpringBootAdapterWrapper = {
	springBootAdapter: new SpringBootAdapter(),
	springBootAdapterIsSet: false,
	get(aUrl, headers) {
		return this.springBootAdapterIsSet && this.springBootAdapter.get(aUrl, headers);
	},
	post(aUrl, headers, body) {
		return this.springBootAdapterIsSet && this.springBootAdapter.post(aUrl, headers, body);
	},
	setAdapter(adapter) {
		this.springBootAdapter = adapter;
		this.springBootAdapterIsSet = true;
	}
}

export default SpringBootAdapterWrapper;