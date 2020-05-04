<script>
    import moment from 'moment';
    import {DATE_FORMAT, DATE_FORMAT_MOMENT} from './appSettings'
    import {costs, categories} from './store.js';
    import {onMount} from "svelte";

    // errors for form validation
    let errors = {};

    // form inputs default values
    const defaultDate = new Date();
    const defaultValue = 500;

    let modalForm;
    let elemModalForm;
    let elemCostCategory;
    let elemCostDate;
    let elemCostValue;

    onMount(async () => {
        let elemDatePickers = document.querySelectorAll('.datepicker');
        M.Datepicker.init(elemDatePickers, {container: 'body', format: DATE_FORMAT});
        M.FormSelect.init(elemCostCategory);
        modalForm = M.Modal.init(elemModalForm, {'onOpenStart': resetForm});
    });

    function addCost() {
        const formData = new FormData(document.forms.formAddCost);
        if (validateFormData(formData)) {
            costs.addCost({
                date: moment(formData.get("cost-date"), DATE_FORMAT_MOMENT).format(),
                category: formData.get("cost-category"),
                value: formData.get("cost-value")
            });
            closeForm();
        }
    }

    function resetForm() {
        errors = {};

        elemCostCategory.selectedIndex = 0;
        elemCostCategory.dispatchEvent(new Event('change'));

        elemCostValue.value = defaultValue;
        M.updateTextFields();

        let datePickerInput = M.Datepicker.getInstance(elemCostDate);
        datePickerInput.setDate(defaultDate);
        datePickerInput.setInputValue();
    }

    function closeForm() {
        modalForm.close();
    }

    function validateFormData(formData) {
        errors = {};
        if (!moment(formData.get("cost-date"), DATE_FORMAT_MOMENT).isValid()) {
            errors.date = "Invalid cost date";
        }
        if (!formData.get("cost-category")) {
            errors.category = "Invalid cost category";
        }
        if (formData.get("cost-value") <= 0) {
            errors.value = "Invalid cost value";
        }
        return (Object.keys(errors).length === 0);
    }
</script>

<style>
    .modal {
        height: 70% !important
    }
</style>

<button data-target="modalNewCost" class="btn modal-trigger">Add new cost <i class="material-icons right">add</i>
</button>
<div id="modalNewCost" class="modal" bind:this={elemModalForm}>
    <div class="modal-content">
        <form class="col s12" name="formAddCost">
            <div class="input-field">
                <select name="cost-category" id="cost-category" bind:this={elemCostCategory}>
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
                <input type=text name="cost-date" id="cost-date" class="datepicker" bind:this={elemCostDate}>
                {#if (errors.date)}<span class="red-text text-darken-2">{errors['date']}</span>{/if}
            </div>

            <div class="input-field col s6">
                <label for="cost-value">Cost value</label>
                <input type=number name="cost-value" id="cost-value" bind:this={elemCostValue}>
                {#if (errors.value)}<span class="red-text text-darken-2">{errors['value']}</span>{/if}
            </div>
            <div class="input-field">
                <button type="submit"
                        on:click|preventDefault={addCost}
                        class="btn waves-effect waves-light">
                    Add Cost <i class="material-icons right">add</i>
                </button>
                <button
                        on:click|preventDefault={closeForm}
                        class="btn waves-effect waves-light teal grey right">
                    Close <i class="material-icons right">close</i>
                </button>
            </div>
        </form>
    </div>
</div>

