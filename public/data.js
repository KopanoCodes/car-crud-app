document.addEventListener("alpine:init", () => {
    Alpine.data('nissan', () => ({
        nissanCount: null,
        vehicles: [],
        newVehicle: {
            color: '',
            make: '',
            model: '',
            reg_number: ''
        },
        deleteRegNumber: '',

        async fetchCountCars() {
            try {
                const response = await axios.get('http://localhost:3007/api/nissansfromCK');
                if (response.data && response.data.count !== undefined) {
                    this.nissanCount = response.data.count;
                } else {
                    this.nissanCount = null;
                }
            } catch (error) {
                console.error('Error fetching Nissan count:', error);
                this.nissanCount = null;
            }
        },

        async fetchcar() {
            try {
                const response = await fetch('http://localhost:3007/api/car');
                if (!response.ok) throw new Error('Failed to fetch cars');
                this.vehicles = await response.json();
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        },

        async addcar() {
            try {
                const response = await fetch('http://localhost:3007/api/car', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newVehicle)
                });

                if (!response.ok) throw new Error('Failed to add car');
                
                this.newVehicle = { color: '', make: '', model: '', reg_number: '' };
                await this.fetchcar();
            } catch (error) {
                console.error('Error adding car:', error);
            }
        },

        async deletecar() {
            try {
                const response = await fetch(`http://localhost:3007/api/car/${encodeURIComponent(this.deleteRegNumber)}`, {
                    method: 'DELETE'
                });

                if (!response.ok) throw new Error('Failed to delete car');
                
                this.deleteRegNumber = '';
                await this.fetchcar();
            } catch (error) {
                console.error('Error deleting car:', error);
            }
        }

    }));
});
