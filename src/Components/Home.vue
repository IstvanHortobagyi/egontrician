<template>
	<div class="section__content">
		<div class="mb-3 text-center">
			<button @click="goToPage('CreateEdit')" class="btn" type="button">Új Árajánlat</button>
		</div>
		<div class="home-container">
			<div class="home">
				<div class="home__title-container">
					<h1 class="home__title h3 mb-0">Árajánlatok</h1>
				</div>
				<div class="home__content">
					<table class="table table--input">
						<thead>
							<tr>
								<th>Dátum</th>
								<th>Ajánlatkérő neve</th>
								<th>Műveletek</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>2025.07.20.</td>
								<td>Szabó Roland</td>
								<td>
									<button class="text-button" type="button">[Szerkesztés]</button>
									<button class="text-button" type="button">[Törlés]</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home"
}
</script>
