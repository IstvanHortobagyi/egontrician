<template>
	<div class="section__content">
		<div class="settings-container">
			<div class="settings">
				<div class="settings__title-container">
					<h1 class="settings__title h3 mb-0">Beállítások</h1>
				</div>
				<div class="settings__content">
					<div class="settings__card">
						<h2 class="settings__card-title h4">Company Details</h2>
						<form>
							<div class="form-group">
								<label class="label" for="name">Name:</label>
								<div class="input-container">
									<input id="name" class="input" type="text">
								</div>
							</div>
							<div class="form-group">
								<label class="label" for="address">Address:</label>
								<div class="input-container">
									<input id="address" class="input" type="text">
								</div>
							</div>
							<div class="form-group">
								<label class="label" for="phone">Phone Number:</label>
								<div class="input-container">
									<input id="phone" class="input" type="tel">
								</div>
							</div>
							<div class="form-group">
								<label class="label" for="email">Email Address:</label>
								<div class="input-container">
									<input id="email" class="input" type="email">
								</div>
							</div>
							<div class="form-group">
								<label class="label" for="taxno">Tax Number:</label>
								<div class="input-container">
									<input id="taxno" class="input" type="number">
								</div>
							</div>
						</form>
					</div>

					<div class="settings__card">
						<h2 class="settings__card-title h4">App Settings</h2>
						<form>
							<div class="form-group">
								<label class="label" for="name">Placeholder:</label>
								<div class="input-container">
									<input id="name" class="input" type="text">
								</div>
							</div>
						</form>
					</div>

					<div class="text-center">
						<button class="btn" type="button"><span class="text-black">S</span>ave</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Settings",

	data() {
		return{

		}
	}
}
</script>
