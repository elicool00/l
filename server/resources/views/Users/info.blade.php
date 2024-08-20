<h3 class="mx-2 my-4">Users registration</h3>

<div class="row justify-content-between mx-1">
    <div class="card card-primary card-outline col-md-5 col-sm-12">
        <div class="card-header">
        <h3 class="card-title">
            <i class="far fa-chart-bar"></i>
                This week
            </h3>
        </div>
        <div class="card-body">
            <div id="bar-week" data-week="{{json_encode($week_reg)}}" style="height: 300px;"></div>
        </div>
    </div>   
    <div class="card card-primary card-outline col-md-6 col-sm-12">
        <div class="card-header">
        <h3 class="card-title">
            <i class="far fa-chart-bar"></i>
                This year
            </h3>
        </div>
        <div class="card-body">
            <div id="bar-year" data-year="{{json_encode($year_info)}}" style="height: 300px;"></div>
        </div>
    </div> 
</div>