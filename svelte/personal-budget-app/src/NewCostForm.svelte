<script>
    import moment from 'moment';
    import {DATE_FORMAT, DATE_FORMAT_MOMENT} from './appSettings'
    import {costs, categories} from './store.js';
    import {onMount} from "svelte";

    let errors = {};

    onMount(async () => {
        let elemSelects = document.querySelectorAll('select');
        let elemDatePickers = document.querySelectorAll('.datepicker');
        let elemModals = document.querySelectorAll('.modal');
        M.FormSelect.init(elemSelects, {container: 'body'});
        M.Datepicker.init(elemDatePickers, {container: 'body', format: DATE_FORMAT, defaultDate: new Date(), setDefaultDate: true});
        M.Modal.init(elemModals);
    });

    function addCost(event) {
        errors = {};
        const formData = new FormData(document.forms.formAddCost);
        let newCost = {
            date: moment(formData.get("cost-date"), DATE_FORMAT_MOMENT).format(),
            category: formData.get("cost-category"),
            value: formData.get("cost-value")
        }
        if (!newCost.date) {
            errors.date = "Invalid cost date";
        }
        if (!newCost.category) {
            errors.category = "Invalid cost category";
        }
        if (newCost.value <= 0) {
            errors.value = "Invalid cost value";
        }
        if (Object.keys(errors).length === 0) {
            costs.addCost(newCost);
            M.Modal.getInstance(document.getElementById('modalNewCost')).close();
        }
    }
</script>

<style>
    .modal {
        height: 70% !important
    }
    .datepicker {

    }
</style>

<button data-target="modalNewCost" class="btn modal-trigger">Add new cost <i class="material-icons right">add</i></button>
<div id="modalNewCost" class="modal">
    <div class="modal-content">
        <form class="col s12" name="formAddCost">
            <div class="input-field">
                <select name="cost-category" id="cost-category">
                    <option value="" disabled selected>Choose category</option>
                    {#each $categories as category}
                        <option value={category.id}>{category.name}</option>
                    {/each}
                </select>
                <label for="cost-category">Cost category</label>
                {#if (errors.category)}<span class="red-text text-darken-2">{errors['category']}</span>{/if}
            </div>

            <div class="input-field col s6">
                <label for="cost-date">Cost date</label>
                <input type=text name="cost-date" id="cost-date" class="datepicker">
                {#if (errors.date)}<span class="red-text text-darken-2">{errors['date']}</span>{/if}
            </div>

            <div class="input-field col s6">
                <label for="cost-value">Cost value</label>
                <input type=number name="cost-value" id="cost-value" value="500">
                {#if (errors.value)}<span class="red-text text-darken-2">{errors['value']}</span>{/if}
            </div>
            <div class="input-field">
                <button
                        type="submit"
                        on:click|preventDefault={addCost}
                        class="btn waves-effect waves-light">
                    Add Cost
                </button>
            </div>
        </form>
    </div>
</div>

