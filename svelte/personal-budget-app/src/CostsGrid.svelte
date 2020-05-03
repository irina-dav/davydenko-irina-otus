<script>
    import moment from 'moment';
    import {paginate, LightPaginationNav} from 'svelte-paginate'
    import {categories, costsOrdered} from './store.js';
    import {DATE_FORMAT_MOMENT} from './appSettings'

    let currentPage = 1
    const pageSize = 10

    $: items = $costsOrdered
    $: paginatedItems = paginate({items, pageSize, currentPage})
</script>

<table>
    <thead>
    <tr>
        <th>#</th>
        <th>Date</th>
        <th>Category</th>
        <th>Value</th>
    </tr>
    </thead>
    <tbody>
    {#each paginatedItems as cost, idx}
        <tr>
            <td>{(currentPage - 1)*pageSize + idx + 1}</td>
            <td>{moment(cost.date).format(DATE_FORMAT_MOMENT)}</td>
            <td>{$categories.find(c => +c.id === +cost.category).name}</td>
            <td>{cost.value}</td>
        </tr>
    {/each}
    </tbody>
</table>
<LightPaginationNav
        totalItems="{items.length}"
        pageSize="{pageSize}"
        currentPage="{currentPage}"
        limit="{1}"
        showStepOptions="{true}"
        on:setPage="{(e) => currentPage = e.detail.page}"/>