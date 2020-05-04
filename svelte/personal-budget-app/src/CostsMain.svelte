<script>
    import PieChart from './PieChart.svelte';
    import Grid from './CostsGrid.svelte';
    import NewCostForm from './NewCostForm.svelte';
</script>

<div class="container">
    <h2>My personal costs</h2>
    <div>
        <NewCostForm/>
    </div>
    <div class="row">
        <div class="col s6">
            <Grid/>
        </div>
        <div class="col s6">
            <PieChart/>
        </div>
    </div>
</div>

