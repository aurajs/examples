<?php 
if (isset($_GET['org'])) { 
  $org = $_GET['org'];
} else {
  $org = 'aurajs';
}
?>



<div class='row'>
  <div class="span3">
    <h3>My Orgs</h3>
    <ul data-aura-widget='user-orgs'></ul>
    <h3>Repos</h3>
    <ul class="nav nav-tabs nav-stacked"
        data-aura-widget="repos"
        data-aura-org="<?php echo $org ?>"
        data-aura-display-filters="true"
        data-aura-params='{ "type" : "private", "sort" : "pushed" }'
    ></ul>
  </div>
  <div class="span9">
    <ul class="unstyled" 
        data-aura-widget="issues" 
        data-aura-org="<?php echo $org ?>"
        data-aura-display-filters="true"></ul>
  </div>
</div>